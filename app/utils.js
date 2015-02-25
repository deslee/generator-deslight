module.exports = {
	addDependencies: function(package_json, packages, dev) {
		var dependencies = dev ? 'devDependencies' : 'dependencies';
		packages.forEach(function(pkg_name) {
			package_json[dependencies][pkg_name] = '*';
		});
	}
}
