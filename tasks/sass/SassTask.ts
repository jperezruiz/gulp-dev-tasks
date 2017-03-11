import {ITaskOptions, BaseTask} from "../BaseTask";
import * as gulpSass from "gulp-sass";
import * as extend from "extend";
export interface ISassTaskOptions extends ITaskOptions {
    sass?: any;//see https://github.com/sass/node-sass#outputstyle
}
export class SassTask extends BaseTask {
    //extend from defaults of BaseTask
    protected static readonly DEFAULTS: ISassTaskOptions = extend(
        true, {}, BaseTask.DEFAULTS, {
            compileAll: true,
            sass: {
                outputStyle: "expanded",
                sourceComments: true
            }
        }
    );
    protected _options: ISassTaskOptions;
    protected _name = "Sass";
    protected _gulpSass = gulpSass;

    constructor(options: ISassTaskOptions) {
        super(options);
        this._options.notify.success.icon = this._path.resolve(__dirname,"assets/notify.png");
        this._options.notify.error.icon = this._path.resolve(__dirname,"assets/notify.png");
    }

    protected _applyCompilePlugin(stream: any, file) {
        return stream.pipe(this._gulpSass(this._options.sass));
    }

    protected _getDefaults(): any {
        return SassTask.DEFAULTS;
    }

    public static registerTasks(gulp, taskInstance?: SassTask) {
        taskInstance = taskInstance || new SassTask(
                {
                    files: "**/*.scss"
                }
            );
        super.registerTasks(gulp, taskInstance);
    }
}
