// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

/* === Use for AoT Compiling ===*/
import { platformBrowser }     from '@angular/platform-browser';

import { AppModuleNgFactory }  from '../aot/unbundled_ts/src/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);