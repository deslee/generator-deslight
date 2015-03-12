jest.dontMock('../<%= name %>.js');

describe('<%= name %>', function() {
	it('is a generic component', function() {
		var React = require('react/addons');
		var <%= name %> = require('../<%= name %>.js');
		var TestUtils = React.addons.TestUtils;

		var Component = TestUtils.renderIntoDocument(
			<<%= name %> />
		);

		expect(true).toBe(true);
	});
});
