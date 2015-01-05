export default vood.Helper( 'statemanager', {
	// Helper goes into userspace, because he propably wants to overwrite it
	events: [{
		action: 'change',
		type: 'hashchange'
	}, {
		action: 'changeUrl',
		type: 'url'
	}],
	////-----------------------------------------------------------------------------------------
	// how should the hash be formed?
	delimiter: '/',
	////-----------------------------------------------------------------------------------------
	// This init is called, when the application startup is done
	init: function() {
		if( !this.changed ){
			this.change( location.hash );
		}
	},
	////-----------------------------------------------------------------------------------------
	// parses the hash and return the state
	getState: function() {
		var newUrl = location.hash.substring( 1,location.hash.length );
		var parts = newUrl.split( this.delimiter );
		while( parts.length > 0 && parts[ parts.length - 1] === '' ){ // Removes trailing slashes
			parts.pop();
		}

		return parts;
	},
	////-----------------------------------------------------------------------------------------
	// Can be called via this.trigger( 'changeUrl', ['foo', 'bar'])
	changeUrl: function( parts ) {
		var newHash = parts.join( this.delimiter );
		if( location.hash != '#' + newHash ){
			location.hash = newHash;
			return true;
		}
		
	},
	////-----------------------------------------------------------------------------------------
	// Tells the browser hash/state
	writeUrl: function() {
		location.hash = this.getUrl();
	},
	////-----------------------------------------------------------------------------------------
	// tells the url of the state
	getUrl: function( state ) {
		return state.join( this.delimiter );
	},
	////-----------------------------------------------------------------------------------------
	// listens to the hachchange event from the browser
	change: function( hash ){
		this.triggerUrl( this.getState() );
	},
	triggerUrl: function( state ) {
		this.changed = true;
		var result = null;
		var url = this.getUrl( state );
		if( url.length ){
			result = this.trigger( '/' + url );
		} else {
			result = this.trigger( '/' );
		}
		if(result.length === 0) {
			this.trigger('/404');
		}
	}
});