var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },


    'el': '#souscategorie',
    'data': {
        ObjSousCategorie: {
            'id': '',
            'libelle': '',
            'idcat': '',
        },
        edit: false,
        souscategoriess: [],
        search: '',
    },
    'methods': {
        listSousCategorie: function () {
            this.$http.get('/Categorie/Index2', function (data) {
                this.$set('scategories', data);
                this.ObjSousCategorie.id = data.length+1;
                this.souscategoriess = data;
               
            })
        },
        listCategorie: function () {
            this.$http.get('/Categorie/AfficherCategories', function (data) {
                this.$set('categories', data);
            })
        },
        addSousCategorie: function () {
            var scategorie = this.ObjSousCategorie;
            this.ObjSousCategorie = { 'id': '', 'libelle': '', 'idcat': '' };
            this.$http.post('/Categorie/AjouterSousCategorie', scategorie);
            this.listSousCategorie();
            toastr.success('Sous Categorie ajoutee Avec Succes');


        },
        editSousCategorie: function (id) {
            this.$http.get('/Categorie/Details2/' + id, function (data) {
                this.ObjSousCategorie.id = data.id;
                this.ObjSousCategorie.libelle = data.libelle;
                this.ObjSousCategorie.idcat = data.idcat;
            })
            this.edit = true;
        },
        MajSousCategorie: function (ObjSousCategorie) {

            this.$http.post('/Categorie/Modifier2/', ObjSousCategorie);
            this.listCategorie();
            toastr.success("Sous Categorie Modifié Avec Succès");
        },
        restinputs: function () {
            this.ObjCategorie = { 'id': '', 'libelle': '', 'idcat': '' };
            this.edit = false;
        },
        deleteSousCategorie: function (id) {
            var confirmartion = confirm("voulez vous supprimer la SousCategorie num  " + id);
            if (confirmartion) {
                this.$http.get('/Categorie/Delete2/' + id);
                this.listSousCategorie();

                toastr.success('SousCategorie bien supprimer');
            } else {
                toastr.error('suppression annulee');
            }
            this.listSousCategorie();
            ;
        },


    },

    ready: function () {
        this.listSousCategorie();
        this.listCategorie();
    },
    computed: {
        filtredsouscategories: function () {
            return this.souscategoriess.filter((souscategorie => {

                return souscategorie.libelle.match(this.search);
            }))
        }
    }

})