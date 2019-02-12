/**
 * Namespace ProductAPIModel
 *
 * Contains interfaces about the product that can be implemented
 * by other objects.
 */
namespace ProductAPIModel {

  /**
   * Interface IUom
   *
   * Defines an interface for the product unit of measurement.
   */
  export interface IUom {
    uom: string;
    barcode: string;
    price: number;
    conversion: any;
  }

  /**
   * Interface IPromoInfo
   *
   * Defines an interface for the product promo.
   */
  export interface IPromoInfo {
    info: string;
  }

  /**
   * Interface IProduct
   *
   * Defines an interface that holds the overall information
   * for a particular product.
   */
  export interface IProduct {
    product_name: string;
    promo_info: Array<IPromoInfo>;
    uoms: Array<IUom>;
    disc_by_qty: Array<IDiscByQty>;
  }

  /**
   * Interface IDiscByQty
   *
   * Defines an interface for the discount of a product for a
   * particular quantity.
   */
  export interface IDiscByQty {
    qty_from: number;
    qty_to: number;
    price: number;
    barcode: string;
    uom: string;
  }
}
