import { byID } from '../../../utils/envConfigs';
import { ResultCard } from '../../base/result/resultCard.Item';
export class AndroidResultCard extends ResultCard {

    priceLC: string = byID('price')
    familyBadgeLC: string = byID('fareFamilyBadge')
    saveBadgeLC: string = byID('savedBadge')
    airlineLC: string = byID('airline')
    flexBoxLC: string = byID('flexBoxBadges')

}