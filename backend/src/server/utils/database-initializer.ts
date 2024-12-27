import { MongoDatasource } from "../../datasources";

export class DatabaseInitializer {
    public static initDatabase(){
        return MongoDatasource();
    }
}