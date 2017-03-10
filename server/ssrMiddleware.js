import React from 'react'
import {match, RouterContext, createMemoryHistory} from 'dva/router';
import {renderToString} from 'react-dom/server'
import {routes} from '../src/router';
import dva from 'dva';


export default function (req, res) {
	match({
		routes,
		location: req.url
	}, (err, redirectLocation, renderProps) => {
		if (err) {
			res
				.status(500)
				.end(`Internal Server Error ${err}`);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {

			// 1. Initialize
			const app = dva({history: createMemoryHistory()});

			// 2. Model
			app.model(require('../src/models/app'))
			app.model(require('../src/models/dashboard'))
			app.model(require('../src/models/users'))

			app.router(({history, renderProps}) => {
				return <RouterContext {...renderProps} />;
			});

			const root = renderToString(app.start()({renderProps}));
			res.render('index.html', {root, state: {}});

		} else {
			res
				.status(404)
				.send('Not found!!')
		}
	});
}
