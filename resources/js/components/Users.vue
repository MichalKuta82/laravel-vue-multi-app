<template>
    <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                  <!--<div class="input-group input-group-sm d-inline-block" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                    </div>
                  </div>-->
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Bio</th>
                            <th>Registered At</th>
                            <th>Modify</th>
                        </tr>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.type}}</td>
                            <td>{{user.bio}}</td>
                            <td>{{user.created_at}}</td>
                            <td>
                                <a href="#" class="blue">Edit <i class="fas fa-edit blue"></i></a>
                                &nbsp;|&nbsp;
                                <a href="#" class="red">Delete <i class="fas fa-trash red"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewLabel">Add New</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createUser">
                  <div class="modal-body">
                    <div class="form-group">
                      <input v-model="form.name" type="text" name="name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Name">
                      <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                      <input v-model="form.email" type="email" name="email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Email">
                      <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                      <textarea v-model="form.bio" name="bio" id="bio" 
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }" placeholder="Bio"></textarea>
                      <has-error :form="form" field="bio"></has-error>
                    </div>
                    <div class="form-group">
                      <select v-model="form.type" type="text" name="type" id="type" 
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                        <option value="">Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">Standard User</option>
                        <option value="author">Author</option>
                    </select>
                      <has-error :form="form" field="type"></has-error>
                    </div>
                    <div class="form-group">
                      <input v-model="form.password" type="password" name="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" placeholder="Password">
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                users: [],
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            createUser(){
                this.form.post('api/user');
            },
            loadUsers(){
                axios.get('api/user')
                    .then(({data}) => {
                        this.users = data.data;
                    });
            }
        },
        created(){
            this.loadUsers();
        }
    }
</script>
