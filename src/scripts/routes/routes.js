import DetailResto from '../views/pages/detail-resto';
import Explore from '../views/pages/explore';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Explore,
  '/favorite': Favorite,
  '/detail/:id': DetailResto,
};

export default routes;
