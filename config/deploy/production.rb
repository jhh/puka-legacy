server 'hydrogen.jeffhutchison.com',
       user: 'puka',
       roles: %w(web),
       ssh_options: {
         auth_methods: %w(publickey)
       }

set :default_env, 'NODE_ENV' => 'production'
