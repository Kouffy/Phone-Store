var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },

    'el': '#adminpanel',

    'data': {
        ObjAdminPanel: {
            'id': '',
            'datecmd': '',
            'idclient': '',
            'qte': '',
            'libelle': '',
            'stock': '',
            'imagep': '',
            'prix': '',
            'catlib': ''
        },
        panelss: [],
        search: ''
    },

    'methods': {
        listAdminPanel: function () {
            this.$http.get('/Commande/ListCommande', function (data) {
                this.$set('adminpanels', data);
                this.panelss = data;
            })
        },
    },

        ready: function () {
            this.listAdminPanel();
    },
    computed: {
        filtredadminpanel: function () {
            return this.panelss.filter((adminpanel => {

                return adminpanel.libelle.match(this.search);
            }))
        }
    }
    
})