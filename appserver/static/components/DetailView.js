/*
 this javascript is created based upon ModalView.js at the following site.
 https://rappaz.tistory.com/4
*/
define([
        'underscore',
        'backbone',
        'jquery',
        'splunkjs/mvc',
        'splunkjs/mvc/searchmanager',
        'splunkjs/mvc/simplexml/element/table'
        ], function(_, Backbone, $, mvc, SearchManager, TableElement) {
        
	this.childViews = [];
        var modalTemplate =
                        "<div id=\"pivotModal\" class=\"modal\">" +
                                "<div class=\"modal-header\"><h3><%- title %></h3></div>" +
                                "<div class=\"modal-body\">" +
                                        "<table style=\"border-style: none; overflow-wrap: anywhere;\">" +
                                        "<tr>" +
                                        "<td>time</td>" +
                                        "<td><%- time %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>src</td>" +
                                        "<td><%- src %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>sig_code</td>" +
                                        "<td><%- sig_code %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>http_referrer</td>" +
                                        "<td><%- http_referrer %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>http_user_agent</td>" +
                                        "<td><%- http_user_agent %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>status</td>" +
                                        "<td><%- status %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>uri</td>" +
                                        "<td><%- uri %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>source</td>" +
                                        "<td><%- source %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>log</td>" +
                                        "<td><%- log %></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>desc</td>" +
                                        "<td><%- desc %></td>" +
                                        "</tr>" +
                                        "</table>" +
                                "</div>" +
                                "<div class=\"modal-footer\"><button class=\"btn btn-success\">Close</button></div>" +
                        "</div>" +
                        "<div class=\"modal-backdrop\"></div>";

        var DetailView = Backbone.View.extend({
                defaults: {
                        title : 'detail'
                },
                initialize: function(options) {
                        this.options = options;
                        this.options = _.extend({}, this.defaults, this.options);
                        this.childViews = [];
                        this.template = _.template(modalTemplate);
                },

                events: {
                    'click .btn-success' : 'close',
                    'click .modal-backdrop': 'close'
                },

                render: function() {
                        var data = {
                                title : this.options.title,
                                src : this.options.src,
                                time : this.options.time,
                                sig_code : this.options.sig_code,
                                http_referrer : this.options.http_referrer,
                                http_user_agent : this.options.http_user_agent,
                                status : this.options.status,
                                uri : this.options.uri,
                                source : this.options.source,
                                log : this.options.log,
                                desc : this.options.desc
                        }
                        this.$el.html(this.template(data));
                        return this;
                },

                show: function() {
                        $(document.body).append(this.render().el);
                        $(this.el).find('.modal-body').append('<div id="modalVizualization"/>');
                        $(this.el).find('.modal').css({
                                                width:'90%',
                                                height:'auto',
                                                left: '5%',
                                                'margin-left': '0',
                                                'max-height':'100%',
                                                'overflow-x': 'auto'
                        });

                        var search = mvc.Components.get(this.options.search.id);

                        var detailTable = new TableElement({
                                                id: "detailTable",
                                                managerid: search.name,
                                                pageSize: "5",
                                                el: $('#modalVizualization')
                        }).render();

                        this.childViews.push(detailTable);
                        search.startSearch();
                },

                close: function() {
                        this.unbind();
                        this.remove();
                       _.each(this.childViews, function(childView){
                                childView.unbind();
                                childView.remove();
                        });
                }
        });
        return DetailView;

});
