require('jade/runtime');

export default vood.Obj({
	templatePrefix: 'templates/',
	jst: {},
	entrance: 'body',
	startPath: 'main/app',
	uidAttrStart: 'data-begin',
	uidAttrEnd: 'data-end',
	list: {},
	init: function() {
		this.checkValidity();
		this.insertTemplates();
		this.insertApp();
	},
	create: function(path) {
		return this.getEntity(path);
	},
	insertTemplates: function() {
		var seen = requirejs._eak_seen;
		for(var seenIndex in seen) {
			if(seenIndex.search(this.templatePrefix) === 0) {
				this.jst[seenIndex] = require(seenIndex).default;
			}
		}
	},
	insertApp: function() {
		var id      = vood.controllerHelper.create(this.startPath, {});
		this.addId($(this.entrance), id);
		vood.controllerHelper.get(id)[0].view._render();
	},
	addId: function(obj, id) {
		obj.first().before(this.scriptStart(id));
		obj.last().after(this.scriptEnd(id));
	},
	getEntity: function(path) {
		if(!this.list[path]) {
			console.log('View ' + path + ' does not exist');
			vood.View(path, {_meta: {pseudo: true}});
		}
		return _.cloneDeep(this.list[path]);
	},
	compileJade: function(path, content) {
		var name = this.templatePrefix + path;
		if(this.jst[name]) {
			return this.jst[name](content);
		} else {
			console.error(path + ' no such template');
			return '';
		}
	},
	
	scriptStart: function(id) {
		return '<script ' + this.uidAttrStart + '="' + id + '"></script>';
	},
	scriptEnd: function(id) {
		return '<script ' + this.uidAttrEnd   + '="' + id + '"></script>';
	},
	trigger: function(controllers, namespace, entity) {

	},
	checkValidity: function() {
		if(!this.entrance) {
			throw "App entrance is not defined";
		}
	}
});