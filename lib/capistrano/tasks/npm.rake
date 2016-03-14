namespace 'puka' do
  task build: ['puka:npm:install', 'puka:npm:build']

  namespace 'npm' do
    desc 'Install dependencies'
    task :install do
      on roles(:web) do
        within release_path do
          execute :npm, 'install', '--no-progress'
        end
      end
    end

    desc 'Build static files'
    task :build do
      on roles(:web) do
        within release_path do
          execute :npm, 'run', 'production'
        end
      end
    end
  end
end
