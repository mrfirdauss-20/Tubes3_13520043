declare global{
    namespace NodeJS{
        interface ProcessEnv{
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: "3000";
            USER: "root";
            PWD: "rSq!!2007";
            DB: "tubes3";
        }
    }
}

export {}