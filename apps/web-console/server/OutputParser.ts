export interface ChatBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text' | 'system';
  content: string;
  timestamp: string;
}

export function stripAnsi(text: string): string {
  const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  return text.replace(ansiRegex, '');
}

export function cleanTerminalProgress(text: string): string {
  const lines = text.split(/\r?\n/);
  const processedLines = lines.map(line => {
    // Split by carriage return to get the last overwritten segment on this line
    const parts = line.split('\r');
    return parts[parts.length - 1];
  });
  return processedLines.join('\n');
}

export class OutputParser {
  private buffer: string = '';
  private currentBubbleId: number = 1;

  constructor() {}

  /**
   * Feed new streaming output from the terminal
   * @param rawData Stream chunk
   * @returns Array of newly extracted or updated ChatBubbles
   */
  public feed(rawData: string): ChatBubble[] {
    let cleanData = stripAnsi(rawData);
    
    // Filter out noisy npm deprecation environment config warnings
    const lines = cleanData.split(/\r?\n/);
    const filteredLines = lines.filter(line => {
      const isNpmWarn = line.includes('npm warn Unknown env config') ||
                        line.includes('This will stop working in the next major version of npm') ||
                        line.includes('See `npm help npmrc` for supported config options');
      return !isNpmWarn;
    });
    
    this.buffer += filteredLines.join('\n');

    // Apply carriage return cleaning on our total buffer
    const readableText = cleanTerminalProgress(this.buffer);

    return this.parseTextToBubbles(readableText);
  }

  /**
   * Clear parser internal state
   */
  public clear(): void {
    this.buffer = '';
    this.currentBubbleId = 1;
  }

  /**
   * Extract thought blocks and ordinary text blocks
   */
  private parseTextToBubbles(text: string): ChatBubble[] {
    const bubbles: ChatBubble[] = [];
    let remaining = text;
    let index = 0;

    const generateId = () => `bubble-${this.currentBubbleId++}`;

    while (remaining.length > 0) {
      const thoughtStart = remaining.indexOf('<thought>');
      const thoughtEnd = remaining.indexOf('</thought>');

      if (thoughtStart !== -1) {
        // There is a thought block coming up.
        if (thoughtStart > 0) {
          // Add leading text block before the thought block
          const textBlock = remaining.substring(0, thoughtStart);
          bubbles.push({
            id: generateId(),
            type: this.detectType(textBlock),
            content: textBlock,
            timestamp: new Date().toISOString()
          });
        }

        if (thoughtEnd !== -1 && thoughtEnd > thoughtStart) {
          // Complete thought block
          const thoughtBlock = remaining.substring(thoughtStart + 9, thoughtEnd);
          bubbles.push({
            id: generateId(),
            type: 'thought',
            content: thoughtBlock,
            timestamp: new Date().toISOString()
          });
          remaining = remaining.substring(thoughtEnd + 10);
        } else {
          // Unclosed thought block (stream is still loading it)
          const thoughtBlock = remaining.substring(thoughtStart + 9);
          bubbles.push({
            id: generateId(),
            type: 'thought',
            content: thoughtBlock,
            timestamp: new Date().toISOString()
          });
          remaining = '';
        }
      } else {
        // No thought block found, but there might be an unclosed closing tag or just raw text
        bubbles.push({
          id: generateId(),
          type: this.detectType(remaining),
          content: remaining,
          timestamp: new Date().toISOString()
        });
        remaining = '';
      }
    }

    return bubbles;
  }

  private detectType(content: string): 'text' | 'tool_call' {
    const trimmed = content.trim();
    if (
      trimmed.startsWith('[run_command]') ||
      trimmed.startsWith('[view_file]') ||
      trimmed.startsWith('[replace_file_content]') ||
      trimmed.startsWith('[write_to_file]') ||
      trimmed.startsWith('Running command') ||
      trimmed.includes('Executing tool')
    ) {
      return 'tool_call';
    }
    return 'text';
  }
}
