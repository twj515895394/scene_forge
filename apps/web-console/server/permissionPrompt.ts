export interface PermissionPromptPayload {
  options: Array<{ kind: 'allow' | 'deny'; label: string; value: string }>;
  title: string;
}

const PERMISSION_PATTERNS = [
  /\[y\/N\]/i,
  /\(y\/n\)/i,
  /\ballow\b/i,
  /\bdeny\b/i,
  /\bapprove\b/i,
  /\bpermission\b/i,
  /\bauthorization\b/i,
  /批准/,
  /拒绝/,
  /授权/,
];

export function sanitizePromptText(text: string): string {
  return text
    .replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isPermissionPromptText(text: string): boolean {
  const cleaned = sanitizePromptText(text);
  if (!cleaned) return false;
  return PERMISSION_PATTERNS.some((pattern) => pattern.test(cleaned));
}

export function buildPermissionPromptPayload(text: string): PermissionPromptPayload | null {
  const cleaned = sanitizePromptText(text);
  if (!isPermissionPromptText(cleaned)) {
    return null;
  }

  return {
    title: cleaned || '系统检测到 Claude CLI 正在请求授权，是否批准？',
    options: [
      { label: '批准写入/执行 (Yes)', value: 'y', kind: 'allow' },
      { label: '拒绝操作 (No)', value: 'n', kind: 'deny' },
    ],
  };
}

const IDE_APPROVAL_GUIDANCE_PATTERNS = [
  /(approve|允许|批准)/i,
  /(IDE|VS\s*Code|JetBrains)/i,
  /(被拦截|写入|执行|操作|write|bash|edit)/i,
];

export function isIdeApprovalGuidanceText(text: string): boolean {
  const cleaned = sanitizePromptText(text);
  if (!cleaned) return false;
  return IDE_APPROVAL_GUIDANCE_PATTERNS.every((pattern) => pattern.test(cleaned));
}

export function buildIdeBlockedPromptPayload(text: string): PermissionPromptPayload | null {
  const cleaned = sanitizePromptText(text);
  if (!isIdeApprovalGuidanceText(cleaned)) {
    return null;
  }

  return {
    title: cleaned,
    options: [
      { label: '开启自动授权并重试', value: 'retry_bypass', kind: 'allow' },
      { label: '已在 IDE 处理，关闭提示', value: 'ack_ide', kind: 'allow' },
      { label: '取消本次操作', value: 'cancel', kind: 'deny' },
    ],
  };
}
