/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Pilsener Light',
      info: 'Cerveza pale lager elaborada originalmente en la ciudad de Pilsen, al oeste de Bohemia (República Checa). Están hechas con maltas de Moravia tipo pilsen, agua de baja dureza y sobre todo con lúpulo checo de Zatec (Saaz) que varía del 2 al 5% de alfa ácidos, y es fermentado con levadura de baja fermentación. Es una bebida de color claro y su contenido de alcohol es medio (de entorno a 3 al 5%) al igual que su extracto.'
    }, {
      name: 'Red Ale',
      info: 'También como Irish red ale, es un tipo de cerveza ale original de Irlanda. Su ligero color rojo es debido al tostado de la cebada además de la malta. Las cervezas normalmente son bajas en alcohol (3,5% es lo típico), aunque se elaboran versiones más potentes para su exportación. La Red Ale sabe menos amarga que las ales inglesas, con un sabor malteado y a caramelo.'
    }, {
      name: 'Lager',
      info: 'Lager es un tipo de cerveza con sabor acentuado que se sirve fría, caracterizada por fermentar en condiciones más lentas empleando levaduras especiales, conocidas como levaduras de fermentación baja, y que en las últimas partes del proceso son almacenadas en bodegas (o lagered - de aquí viene su nombre) durante un período en condiciones de baja temperatura con el objeto de limpiar las partículas residuales y estabilizar los sabores.'
    }, {
      name: 'Stout',
      info: 'Estilo de cerveza, tipo ale, muy oscura, originario de las islas británicas. Era el nombre utilizado para la cerveza más fuerte (stout), de 7 % a 8 % de alcohol por volumen, producido por cada cervecería, aunque hoy en día, hay mucha más variedad y pueden ser más dulces o secas, y de 4 % a 8 % de alcohol por volumen.'
    }, {
      name: 'Porter',
      info: 'Tiene el aroma del malteado y el amargor del lúpulo. Es generalmente fuerte y oscura. Se elabora preferentemente con aguas de bajo contenido en calcio (blandas). La porter se relaciona popularmente con la cerveza stout, siendo ésta la cerveza con más graduación (de 7 % a 8 % de alcohol en volumen) que producía cada cervecería. '
    }, {
      name: 'Lambic',
      info: 'La cerveza de trigo y cebada de tipo lambic se elabora principalmente en Bruselas (Bélgica) utilizando levaduras silvestres obtenidas por fermentación espontánea, por esta razón presenta un fuerte carácter ácido.'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      client_name: 'Test Client',
      address: 'Test Address',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      client_name: 'Administration',
      address: 'Ciudad Quesada',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
