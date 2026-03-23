module.exports = {
  apps: [
    {
      name: 'loaniq-express',
      script: './index.js',
      instances: 3,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      env: {
        PORT: 5000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 5000,
        NODE_ENV: 'production',
      },
      watch: false,
      max_memory_restart: '300M',
    }
  ]
};
