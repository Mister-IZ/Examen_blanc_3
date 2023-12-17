import Model from './Model.js';

export default class immeuble extends Model {

  static table = "appart.rooms";
  static primary = ["id"];
}
