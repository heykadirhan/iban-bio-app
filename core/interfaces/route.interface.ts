import { Routes } from '@core/constants';
import { Locale } from '@core/enums';

export type IRoute = keyof (typeof Routes)[Locale];
