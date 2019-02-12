namespace MemberAPIModel {

  /**
   * Interface IMember
   *
   * Defines an interface that contains the overall information
   * of a particular member.
   */
  export interface IMember {
    card_no: string;
    name: string;
    address: string;
    member_type: string;
    point: number;
    coupon: number;
    identity_no: string;
    phone: string;
    point_valid_until: string;
  }
}
