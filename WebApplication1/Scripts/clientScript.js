var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },


    'el': '#client',
    'data': {
        Nclient: {
            'id': '',
            'nom': '',
            'prenom': '',
            'cin': '',
            'email': '',
            'passwordd': '',
            'tel': '',
            'role' : ''
        },
        edit: false,
        clientss: [],
        filtrerclient: ''
    },
    'methods': {
        listclient: function () {
            this.$http.get('/Client/AfficherClient', function (data) {
                this.$set('clients', data);
                this.clientss = data;
                this.Nclient.id = data.length+1;
            })
        },


        addClient: function () {
            var client = this.Nclient;
            this.Nclient = { 'id': '', 'nom': '', 'prenom': '', 'cin': '', 'email': '', 'passwordd': '', 'tel': '' };
            this.$http.post('/Client/Create', client);
            this.listclient();
            toastr.success('client ajouter');


        },

        editClient: function (id) {
            this.$http.get('/Client/Details/' + id, function (data) {
                this.Nclient.id = data.id;
                this.Nclient.nom = data.nom;
                this.Nclient.prenom = data.prenom;
                this.Nclient.cin = data.cin;
                this.Nclient.email = data.email;
                this.Nclient.passwordd = data.passwordd;
                this.Nclient.tel = data.tel;
            })
            this.edit = true;
        },
        MajClient: function (Nclient) {
            this.$http.post('/Client/Modifier/',Nclient);
          //  this.listclient();
            toastr.success("Client Modifié Avec Succès");
            this.edit = false;

        },
        deleteClient: function (id) {
            var confirmartion = confirm("voulez vous supprimer le client num  " + id);
            if (confirmartion) {
                this.$http.get('/Client/Delete/' + id);
                this.listclient();

                toastr.success('client bien supprimer');
            } else {
                toastr.error('suppression annuler');
            }
            this.listclient();
            this.$forceUpdate();
        }

    },
    ready: function () {
        this.listclient();
    },
    computed: {
        filtredclients: function () {
            return this.clientss.filter((client => {
                return client.nom.match(this.filtrerclient);
            }))
        }
    }

})