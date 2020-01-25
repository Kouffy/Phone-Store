
var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },

    'el': "#categorie",

    'data': {
        ObjCategorie: {
            'id': '',
            'libelle': ''
        },
        edit: false,
        categoriess :[],
        search: ''
    },

    'methods': {
        listCategorie: function () {
            this.$http.get('/Categorie/AfficherCategories', function (data) {
                this.$set('categories', data);
                this.categoriess = data;
                this.ObjCategorie.id = data.length+1;
            })
        },

        addCategorie: function () {
            var categorie = this.ObjCategorie;
            this.ObjCategorie = { 'id': '', 'libelle': '' };
            this.$http.post('/Categorie/Create', categorie);
            this.listCategorie();
            toastr.success('Categorie ajout\ée');
        },
        editCategorie: function (id) {
            this.$http.get('/Categorie/Details/' + id, function (data) {
                this.ObjCategorie.id = data.id;
                this.ObjCategorie.libelle = data.libelle;
            })
            this.edit = true;
        },
        MajCategorie: function (ObjCategorie) {
            this.$http.post('/Categorie/Modifier', ObjCategorie);
            this.listCategorie();
            toastr.success("Categorie Modifié Avec Succès");
        },
        restinputs: function () {
            this.ObjCategorie = { 'id': '', 'libelle': '' };
            this.edit = false;
        },
        deleteCategorie: function (id) {
            var confirmartion = confirm("voulez vous supprimer La Categorie num  " + id);
            if (confirmartion) {
                this.$http.get('/Categorie/Delete/' + id);
                this.listCategorie();

                toastr.success('la categorie a été bien supprimé');
            } else {
                toastr.error('suppression annulée');
            }
            this.listCategorie();
            this.$forceUpdate();
        }



    },


    ready: function () {
        this.listCategorie();
        
    },
    computed: {
        filtredcategories: function () {
            return this.categoriess.filter((categorie => {
                return categorie.libelle.match(this.search);
            }))
        }
    }

})