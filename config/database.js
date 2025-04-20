const sql = require('mssql');

const config = {
    server: 'LAPTOP-THEVU210\\THEVU',
    user: 'thevu2109',
    password: 'thevu2109',
    database: 'codemasterDb', // Thay đổi từ 'master' thành 'codemasterDb'
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};