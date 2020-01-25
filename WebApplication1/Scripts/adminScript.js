var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },

    'el': '#admin',
    'data': {
        ObjAdmin: {
            'id': '',
            'nom': '',
            'prenom': '',
            'cin': '',
            'email': '',
            'passwordd': '',
            'tel': ''
        },
        //variable
        edit: false,
        adminss: [],
        filtreradmin : ''
    },
    'methods': {
        listAdmin: function () {
            this.$http.get('/Admin/AfficherAdmin', function (data) {
                this.$set('admins', data);
                this.adminss = data;
                this.ObjAdmin.id = data.length+1;
            })
        },
        addAdmin: function () {
            var admin = this.ObjAdmin;
            this.ObjAdmin = { 'id': '', 'nom': '', 'prenom': '', 'cin': '', 'email': '', 'passwordd': '', 'tel': '' };
            this.$http.post('/Admin/Ajouter', admin);
            this.listAdmin();
            toastr.success('Admin Ajout" Avec Succes');
        },
        listerAdmin: function (id) {
            this.$http.get('/Admin/Details/' + id, function (data) {
                this.ObjAdmin.id = data.id;
                this.ObjAdmin.nom = data.nom;
                this.ObjAdmin.prenom = data.prenom;
                this.ObjAdmin.cin = data.cin;
                this.ObjAdmin.email = data.email;
                this.ObjAdmin.passwordd = data.passwordd;
                this.ObjAdmin.tel = data.tel;
            })
            this.edit = true;
        },
        restinputs: function () {
            this.ObjAdmin = { 'id': '', 'nom': '', 'prenom': '', 'cin': '', 'email': '', 'passwordd': '', 'tel': '' };
            this.edit = false;
        },
        updateAdmin: function (ObjAdmin) {
            this.$http.post('/Admin/Modifier', ObjAdmin);
            this.listAdmin();
            toastr.success("Admin Modifié Avec Succès");

        },

        deleteAdmin: function (id) {
            var confirmartion = confirm("voulez vous supprimer l\'Admin num  " + id);
            if (confirmartion) {
                this.$http.get('/Admin/Delete/' + id);
                this.listAdmin();
                toastr.success('client a été bien supprimé');
            } else {
                toastr.error('suppression annulée');
            }
            this.listAdmin();
            this.$forceUpdate();
        }
    },
    computed: {
        filtredadmins: function () {
            return this.adminss.filter((admin => {
                return admin.nom.match(this.filtreradmin);
            }))
        }
    },

    ready: function () {
        this.listAdmin();
    }

})