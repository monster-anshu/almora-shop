import path from 'path';
import { bootstrap } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { config } from './vendure-config';
import initialData from '@vendure/create/assets/initial-data.json';

// Sample products CSV provided by @vendure/create
const productsCsvFile = path.join(
    path.dirname(require.resolve('@vendure/create')),
    'assets/products.csv'
);


populate(
    () => bootstrap(config),
    initialData,
    productsCsvFile,
)
    .then(app => app.close())
    .then(
        () => process.exit(0),
        err => {
            console.log(err);
            process.exit(1);
        },
    );
