import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class SkuPipe implements PipeTransform<string, string> {
    private static readonly FORMAT = /^[A-Z]{3}-[A-Z]{3,4}-\d+[A-Z]*$/;

    transform(value: string): string {
        const sku = (value ?? '').trim().toUpperCase();
        if (!SkuPipe.FORMAT.test(sku)) {
            throw new BadRequestException(
                'Invalid SKU format. It should be in the format of ARR-COST-5KG'
            );
        }

        return sku;
    }
}
