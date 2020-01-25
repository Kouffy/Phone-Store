var vm = new Vue({
    el: '#commande',

    data: {
        ObjCommande: {
            'id': '',
            'datecmd': '',
            'idclient': '',
            'idproduit': '',
            'qte':'',
        },
        ObjProduit: {
            'idproduit': '',
            'stock': '',
            'image': '',
        },
        cmd: false,
        produitss2: [],
        scategoriess: [],
        search2: '',
        searchscat : ''
        
    },
    methods: {
        listProduit: function () {
            this.$http.get('/Produit/AfficherProduit', function (data) {
                this.$set('produits', data);
                this.produitss2 = data;
            })
        },
        listCategorieinput: function () {
            this.$http.get('/Categorie/AfficherCategories', function (data) {
                this.$set('categories', data);
            });
            this.$http.get('/SousCategorie/AfficherSousCategories', function (data) {
                this.scategoriess = data;
            })

        },
        getProduitById: function (id) {
            
            this.$http.get('/Produit/Details/' + id, function (data) {
                this.ObjProduit.idproduit = data.id;
                this.ObjProduit.stock = data.stock;
                this.ObjProduit.image = data.imagep;
                this.ObjCommande.idproduit = data.id;
            });
            this.cmd = true;
        },

        createCommande: function ()
        {
            this.ObjCommande.id = Math.floor(Math.random() * (15555 - 12222 + 1) + 12222);
            this.$http.post('/Commander/Create', this.ObjCommande);
            toastr.success('Commndee avec Succès');
            this.cmd = false;
        },
        createLigneCommande: function () {
           

            toastr.success('Commnder avec Succès 2');
        },

        restinputs: function () {
            this.ObjCommande = { 'id': '', 'datecommande': '', 'idclient': '' };
            this.ObjLigneCommande = { 'idcommande': '', 'idproduit': '', 'qte': '' };
            this.ObjProduit = { 'idproduit': '', 'stock': 'image' };
        },

    },
    ready: function () {
        this.listProduit();
        this.listCategorieinput();
    },
    computed: {
        filtredproduits2: function () {
            return this.produitss2.filter((produit => {
                return produit.idcat.toString().match(this.searchscat);

            }))
        },
        filtredcats: function () {
            return this.scategoriess.filter((cat => {

                return cat.idcat.toString().match(this.search2);

            }))
        }
    }

})
