module.exports = {
	addDependencies: function(package_json, packages, dev) {
		var dependencies = dev ? 'devDependencies' : 'dependencies';
		packages.forEach(function(pkg) {
			var pkg_name = typeof(pkg) === 'string' ? pkg : pkg[0];
			var pkg_version = typeof(pkg) === 'string' ? '*' : pkg[1];
			package_json[dependencies][pkg_name] = pkg_version;
		});
	}
}
