<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
                <router-link to="/dashboard" class="nav-link">
                  <p>
                    Dashboard
                  </p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
