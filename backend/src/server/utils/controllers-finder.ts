import * as path from "path";
import * as fs from "fs";

export class ControllersFinder{
    private rootDir: string = path.join(__dirname, "../../modules");

    constructor() {
        //
    }

    public searchControllers(): string[] {
        const result: string[] = [];
        this.recursiveSearch(this.rootDir, result);
        return result;
    }

    private recursiveSearch(currentDir: string, result: string[]): void {
        const items = fs.readdirSync(currentDir, { withFileTypes: true });
    
        for (const item of items) {
          if (item.isDirectory()) {
            const fullPath = path.join(currentDir, item.name);
    
            if (item.name === 'controllers') {
              result.push(fullPath);
            } else {
              this.recursiveSearch(fullPath, result);
            }
          }
        }
    }
}