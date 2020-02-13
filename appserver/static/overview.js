 require.config({
 paths: {
 "DetailView": '../app/app_ilog-scanner/components/DetailView'
 }
 });
 require([
 'underscore',
 'backbone',
 'splunkjs/mvc',
 'splunkjs/mvc/tableview',
 'DetailView',
 'splunkjs/mvc/simplexml/ready!'
 ], function(_, Backbone, mvc, tableview, DetailView) {
 var evt = mvc.Components.get('evt');

 evt.on("click", function(e) {
     e.preventDefault();
     var _time = e.data['row._time'];
     var _sig_code = e.data['row.sig_code'];
     var _src = e.data["row.src"];
     var _http_referrer = e.data["row.http_referrer"];
     var _http_user_agent = e.data["row.http_user_agent"];
     var _status = e.data["row.status"];
     var _uri = e.data["row.uri"];
     var _source = e.data["row.source"];
     var _log = e.data["row.log"];
     var _desc = e.data["row.desc"];
     var modal = new DetailView({
                                 time : _time,
                                 sig_code : _sig_code,
                                 src : _src,
                                 http_referrer : _http_referrer,
                                 http_user_agent : _http_user_agent,
                                 status : _status,
                                 uri : _uri,
                                 source : _source,
                                 log : _log,
                                 desc : _desc
     });
     modal.show();
  });
 });
