/**
 * WebMCP（W3C Web Machine Learning 社区组草案）的环境类型声明。
 *
 * 目前只有 Chrome 146+ 作为实验特性提供，稳定版浏览器都还没有这个 API，
 * 所以 `Document.modelContext` 声明成可选属性——用的地方必须先做特性检测
 * （`if (!document.modelContext) return;`），类型系统也借此强制这一点。
 *
 * 类型对照的是 webmachinelearning/webmcp 仓库 index.bs 里的 IDL，不是网上的
 * 二手转述；spec 之前用过的 `navigator.modelContext` 和 `provideContext` 都已
 * 废弃，这里不声明。
 */

interface ToolAnnotations {
  /** 只读、不改变状态。 */
  readOnlyHint?: boolean;
  /** 输出可能包含不可信内容。 */
  untrustedContentHint?: boolean;
  /** 会触发不可逆的现实动作（订票、转账等）。 */
  consequentialHint?: boolean;
}

interface ToolExecuteCallbackOptions {
  readonly signal: AbortSignal;
}

type ToolExecuteCallback = (
  inputObject: object,
  options: ToolExecuteCallbackOptions,
) => Promise<unknown>;

interface ModelContextTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: object;
  execute: ToolExecuteCallback;
  annotations?: ToolAnnotations;
}

interface ModelContextRegisterToolOptions {
  exposedTo?: string[];
  signal?: AbortSignal;
}

interface ModelContextGetToolOptions {
  fromOrigins?: string[];
}

interface ModelContextExecuteToolOptions {
  signal?: AbortSignal;
}

/**
 * `getTools` 返回的完整工具描述符——不只是个引用句柄，还带着注册时的
 * schema、来源窗口和 origin，`executeTool` 用它来定位并调用目标工具。
 */
interface RegisteredTool {
  readonly name: string;
  readonly title?: string;
  readonly description: string;
  readonly inputSchema?: object;
  readonly window: Window;
  readonly origin: string;
  readonly annotations?: ToolAnnotations;
}

interface ModelContext extends EventTarget {
  registerTool(
    tool: ModelContextTool,
    options?: ModelContextRegisterToolOptions,
  ): Promise<undefined>;
  getTools(options?: ModelContextGetToolOptions): Promise<RegisteredTool[]>;
  executeTool(
    tool: RegisteredTool,
    inputObject?: object,
    options?: ModelContextExecuteToolOptions,
  ): Promise<string>;
  ontoolchange: ((this: ModelContext, ev: Event) => unknown) | null;
}

interface Document {
  /** 仅安全上下文、支持的浏览器才有此属性，故为可选。 */
  readonly modelContext?: ModelContext;
}
