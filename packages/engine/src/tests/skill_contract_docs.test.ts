import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(__dirname, '../../../..');

const skillDirs = [
  '.agents/skills/scene-design-builder',
  '.agents/skills/scene-storyboard-director',
  '.agents/skills/scene-video-prompt-builder',
];

const zhFirstReferenceFiles = [
  '.agents/skills/scene-design-builder/references/design-prompt-template.md',
  '.agents/skills/scene-design-builder/references/required-deliverables.md',
  '.agents/skills/scene-design-builder/references/review-checklist.md',
  '.agents/skills/scene-design-builder/references/workflow.md',
  '.agents/skills/scene-storyboard-director/references/required-deliverables.md',
  '.agents/skills/scene-storyboard-director/references/review-checklist.md',
  '.agents/skills/scene-storyboard-director/references/storyboard-prompt-template.md',
  '.agents/skills/scene-storyboard-director/references/workflow.md',
  '.agents/skills/scene-video-prompt-builder/references/required-deliverables.md',
  '.agents/skills/scene-video-prompt-builder/references/review-checklist.md',
  '.agents/skills/scene-video-prompt-builder/references/video-prompt-template.md',
  '.agents/skills/scene-video-prompt-builder/references/workflow.md',
];

function read(relativePath: string): string {
  return fs.readFileSync(path.resolve(repoRoot, relativePath), 'utf8');
}

function lineCount(content: string): number {
  return content.trimEnd().split(/\r?\n/).length;
}

test('core skill output contracts stay slim machine contracts', () => {
  for (const skillDir of skillDirs) {
    const contractPath = `${skillDir}/references/output-contract.md`;
    const content = read(contractPath);
    assert.ok(lineCount(content) <= 120, `${contractPath} should stay within 120 lines`);
    assert.match(content, /短机器契约/, `${contractPath} should identify itself as a short machine contract`);
    assert.match(content, /不是执行流程文档/, `${contractPath} should not be treated as the workflow source`);
  }
});

test('core skill default reading order does not require output-contract', () => {
  for (const skillDir of skillDirs) {
    const skillPath = `${skillDir}/SKILL.md`;
    const content = read(skillPath);
    assert.doesNotMatch(content, /执行本技能时按顺序读取：[\s\S]*output-contract\.md/, `${skillPath} should not make output-contract a default required read`);
    assert.match(content, /按需读取/, `${skillPath} should describe output-contract as on-demand`);
  }
});

test('core skill reference titles are Chinese-first', () => {
  for (const relativePath of zhFirstReferenceFiles) {
    const firstHeading = read(relativePath).split(/\r?\n/).find((line) => line.startsWith('# ')) ?? '';
    assert.match(firstHeading, /[\u4e00-\u9fff]/, `${relativePath} should have a Chinese-first title`);
  }
});
