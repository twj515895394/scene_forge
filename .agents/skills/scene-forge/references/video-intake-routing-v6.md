# SceneForge v6 Video Intake Routing

## 视频源输入识别

以下输入默认视为视频源输入：

- video_file
- video_url
- short_video_url
- frame_sequence

典型形式：

- 用户上传视频文件
- 用户提供视频链接
- 用户提供短视频平台链接
- 用户提供来自同一视频的截图序列

## 路由规则

若项目不存在 `source_intake.status: analyzed`：

```text
scene-video-intake
-> scene-topic-gate
-> 后续主流程
```

普通文字创意、剧情想法、桥段概述、角色想法：

```text
scene-topic-gate
-> 后续主流程
```

## 总控职责

scene-forge 负责：

- 识别视频源输入
- 创建或定位项目
- 初始化 source_intake
- 路由到 scene-video-intake

scene-forge 不负责：

- 重新解析视频内容
- 替代 scene-video-intake 生成 handoff
- 自动创建 source asset
