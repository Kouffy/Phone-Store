var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },
    'el': "#produit",
    'data': {
        ObjProduit: {
            'id': '',
            'libelle': '',
            'stock': '',
            'imagep': '',
            'prix': '',
            'idcat': ''
        },
        edit: false,
        produitss: [],
        search: '',
        image_up: ''
    },
    'methods': {
        onFileChanged(event) {
            this.image_up = event.target.files[0]
        },
        sifatlProduit: function () {
            let formData = new FormData();
            let files = this.image_up;         
            formData.append('id', this.ObjProduit.id);
            formData.append('libelle', this.ObjProduit.libelle);
            formData.append('stock', this.ObjProduit.stock);
            formData.append('imagep', this.ObjProduit.imagep);
            formData.append('prix', this.ObjProduit.prix);
            formData.append('idcat', this.ObjProduit.idcat);
            formData.append('fichier', files);
            this.$http.post('/Produit/AjouterProduit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            this.listProduit();
            toastr.success("Produit Ajoute Avec Succès");
        },
        listProduit: function () {
            this.$http.get('/Produit/AfficherProduit', function (data) {
                this.$set('produits', data);
                this.ObjProduit.id = data.length+1;
                this.produitss = data;

            })
        },
        editProduit: function (id) {
            this.edit = true;
            this.$http.get('/Produit/Details/' + id, function (data) {
                this.ObjProduit.id = data.id;
                this.ObjProduit.libelle = data.libelle;
                this.ObjProduit.stock = data.stock;
                this.ObjProduit.imagep = data.imagep;
                this.ObjProduit.prix = data.prix;
                this.ObjProduit.idcat = data.idcat;
            })
        },
        MajProduit: function (ObjProduit) {
            this.$http.post('/Produit/ModifierProduit/', ObjProduit);
            this.listProduit();
            toastr.success("Produit Modifié Avec Succès");
            this.edit = false;
        },
        restinputs: function () {
            this.ObjCategorie = { 'id': '', 'libelle': '', 'stock': '', 'imagep': '', 'prix': '', 'idcat': '' };
            this.edit = false;
        },
        deleteProduit: function (id) {
            var confirmartion = confirm("voulez vous supprimer Le Produit num  " + id);
            if (confirmartion) {
                this.$http.get('/Produit/SupprimerProduit/' + id);
                this.listProduit();

                toastr.success('le produit a été bien supprimé');
            } else {
                toastr.error('suppression annulée');
            }
            this.listProduit();
        },
        listSousCategorie: function () {
            this.$http.get('/Categorie/Index2', function (data) {
                this.$set('scategories', data);
                this.ObjSousCategorie.id = data.length + 1;
                this.souscategoriess = data;

            })
        },

    },
    ready: function () {
        this.listProduit();
        this.listSousCategorie();
    },
    computed: {
        filtredproduits: function () {
            return this.produitss.filter((produit => {

                return produit.libelle.match(this.search);
            }))
        },
    
    }
})