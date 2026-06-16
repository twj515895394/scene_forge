# Video Prompt Builder Skill Contract Standard Task Plan

## Goal

重构 `scene-video-prompt-builder` skill 为标准结构，并让 video_prompts validator 检查真实交付文件、manifest、board 索引、pack 体裁和确认闸口。

## Phases

### Phase 1: 设计与 issue
**Status:** complete
- 写实施计划
- 创建 Issue 44

### Phase 2: Skill 标准化
**Status:** complete
- 精简 `SKILL.md`
- 新增 workflow / required deliverables / review checklist / video prompt template

### Phase 3: Validator 加固
**Status:** complete
- 检查真实文件与 manifest
- 检查 board 索引
- 检查 pack 文件四层强结构和声音四层
- 检查快速模式确认闸口

### Phase 4: 回归验证
**Status:** complete
- engine build/test
- web-console build

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| Shallow negative test was stopped by deep contract before delivery checks | Engine test for SF-VP-204/SF-VP-205 | Updated fixture so deep markers pass while pack delivery shape remains invalid |
