<template>
    <div class="container mt-5">
        <div v-if="$gate.isAdminOrAuthor()" class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                <button class="btn btn-success" @click="newUser">Add New <i class="fas fa-user-plus fa-fw"></i></button>
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
                        <tr v-for="user in users.data" :key="user.id">
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.type | upText}}</td>
                            <td>{{user.bio}}</td>
                            <td>{{user.created_at | myDate}}</td>
                            <td>
                                <button @click="editUser(user)" class="blue btn btn-sm btn-link" type="button">Edit <i class="fas fa-edit blue"></i></button>
                                &nbsp;|&nbsp;
                                <button @click="deleteUser(user.id)" class="red btn btn-sm btn-link" type="button">Delete <i class="fas fa-trash red"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
            <pagination :data="users" @pagination-change-page="getResults"></pagination>
          </div>
        </div>

        <div v-if="!$gate.isAdminOrAuthor()">
            <not-found></not-found>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-if="editmode" class="modal-title blue" id="addNewLabel">Update User's Info</h5>
                    <h5 v-else class="modal-title green" id="addNewLabel">Add New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
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
                    <button v-if="editmode" type="submit" class="btn btn-primary">Update</button>
                    <button v-else type="submit" class="btn btn-success">Create</button>
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
                editmode: false,
                users: {},
                form: new Form({
                    id: '',
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
            newUser(){
                this.form.reset();
                $('#addNew').modal('show');
            },
            editUser(user){
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/' + this.form.id)
                    .then(() => {
                        Toast.fire({
                          type: 'success',
                          title: 'The user ' + this.form.name + ' has been updated successfully'
                        });
                        $('#addNew').modal('hide');
                        this.$Progress.finish();
                        Fire.$emit('afterAction');
                    }).catch(() => {
                        this.$Progress.fail();
                    });
            },
            createUser(){
                this.editmode = false;
                this.$Progress.start();
                this.form.post('api/user')
                    .then(() => {
                        Fire.$emit('afterAction'); //create custom event Fire
                        $('#addNew').modal('hide');
                        Toast.fire({
                          type: 'success',
                          title: 'The user ' + this.form.name + ' has been created successfully'
                        });
                        this.$Progress.finish();
                    }).catch(() => {
                        this.$Progress.fail();
                    });
                
            },
            loadUsers(){
                if(this.$gate.isAdminOrAuthor()){
                    axios.get('api/user')
                        .then(({data}) => {
                            this.users = data;
                        });
                }
            },
            deleteUser(id){
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    // send request to the server
                    if (result.value){
                        this.form.delete('api/user/' + id)
                            .then(() => {
                                Swal.fire('Deleted!', 'The user ' + this.form.name + ' has been deleted.', 'success');
                                Fire.$emit('afterAction');
                            }).catch(() => {
                                this.$Progress.fail();
                                Swal.fire('Failed', 'There was something wrong.', 'warning');
                            });
                    }
                })
            },
            getResults(page = 1) {
                axios.get('api/user?page=' + page)
                    .then(response => {
                        this.users = response.data;
                    });
            }
        },
        created(){
            this.loadUsers();
            Fire.$on('afterAction', () => {
                this.loadUsers(); //listen for custom event Fire
            });
            // setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
