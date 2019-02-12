/**
 * Namespace ProductAPI Object
 *
 * Contains concrete classes that implements all the product related
 * interfaces from the namespace `ProductAPIModel`.
 */
namespace ProductAPIObject {

  /**
   * Class Product
   *
   * Implements `IProduct` interface from `ProductAPIModel` namespace
   * and defines the overall information of a product.
   */
  export class Product implements ProductAPIModel.IProduct {
    product_code: string;
    product_uom: string;
    product_price: number;
    prodcut_image: string;
    product_minuom: string;

    product_name: string;
    uoms: Array<ProductAPIModel.IUom>;
    promo_info: Array<ProductAPIModel.IPromoInfo>;
    disc_by_qty: Array<ProductAPIModel.IDiscByQty>;
  }

  /**
   * Class Uom
   *
   * Implements `IUom` interface from `ProductAPIModel` namespace
   * and defines the information about a product unit of measurement.
   */
  export class Uom implements ProductAPIModel.IUom {
    uom: string;
    barcode: string;
    price: number;
    conversion: any;
  }

  /**
   * Class Promo_info
   *
   * Implements `IPromoInfo` interface from `ProductAPIModel` namespace
   * and defines the information about a promo for a product.
   */
  export class Promo_info implements ProductAPIModel.IPromoInfo {
    info: string;
  }

  /**
   * Class Disc_by_qty
   *
   * Implements `IDiscByQty` interface from `ProductAPIModel` namespace
   * and defines the information about a discount for a product.
   */
  export class Disc_by_qty implements ProductAPIModel.IDiscByQty {
    qty_from: number;
    qty_to: number;
    price: number;
    barcode: string;
    uom: string;
  }
}
