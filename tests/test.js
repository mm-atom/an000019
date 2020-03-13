const test = require('ava');

const { default: a } = require('../dist/index');

test('expire config', async (t) => {
	const r = await a('key');
	t.is(r, true);
});

test('expire custom', async (t) => {
	const r = await a('key', 20000);
	t.is(r, true);
});
