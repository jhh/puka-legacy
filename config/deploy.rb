# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'puka-static'
set :repo_url, 'https://github.com/jhh/puka-react.git'
set :branch, 'master'

set :deploy_to, '/srv/puka-static'
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

set :log_level, :info

namespace :deploy do
  after :deploy, 'puka:build'
end
