var vn = new Vue({
    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },

    'el': '#message',
    'data': {
        ObjMsg: {
            'id': '',
            'name': '',
            'email': '',
            'sujet': '',
            'MESSAGE': '',
        },
        msgss: [],
        filtermsg: ''

    },
    'methods': {
        listMsg: function () {
            this.$http.get('/Messenger/AfficherMSG', function (data) {
                this.$set('msgs', data);
                this.msgss = data;
                this.ObjMsg.id = data.length + 1;
            })
        },
        addMsg: function () {
            var Msg = this.ObjMsg;
            this.$http.post('/Messenger/AjouterMSG', Msg);
            this.listMsg();
            toastr.success('Message Envoye Avec Succes');
        },

        restinputs: function () {
            this.ObjMsg = { 'id': '',};
        },

        deleteAdmin: function (id) {
            var confirmartion = confirm("voulez vous supprimer le message num  " + id);
            if (confirmartion) {
                this.$http.get('/Mesenger/DeleteMSG/' + id);
                this.listMsg();
                toastr.success('Message a été bien supprimé');
            } else {
                toastr.error('suppression annulée');
            }
            this.listMsg();
            this.$forceUpdate();
        }
    },
    computed: {
        filtredmsgs: function () {
            return this.msgss.filter((msg => {
                return msg.name.match(this.filtermsg);
            }))
        }
    },

    ready: function () {
        this.listMsg();
    }

})