import { Request, Response } from 'express';
import { controller, use,get } from '../../../shared/decorators';
import { auth } from '../../../middlewares/auth';


@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    return res.render('pages/landing/content')
  }
}
