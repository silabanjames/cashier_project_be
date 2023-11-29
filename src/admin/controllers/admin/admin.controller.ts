import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, Res, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductDto } from 'src/admin/dtos/CreateProduct.dto';
import { UpdateProductDto } from 'src/admin/dtos/UpdateProduct.dto';
import { AdminService } from 'src/admin/services/admin/admin.service';
import { Roles } from 'src/decorators/Roles.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { UUIDValidationPipe } from 'src/pipes/UuidValidation.pipes';
import { Product } from 'src/typeorm/entities/Product';

export const storage = {
    storage: diskStorage({
        destination: './store/productImages',
        filename: (req, file, cb) => {
            const filename: string = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${filename}${extname(file.originalname)}`)
        }
    })
}

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}
    
    // @Post('create-product')
    // createProduct(@Body() createProductDto: CreateProductDto): Promise<any>{
    //     return this.adminService.createProduct(createProductDto);
    // }

    @Post('create-product')
    @UseInterceptors(FileInterceptor('file', storage))
    createProduct(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File){
        // console.log(file.path)
        return this.adminService.createProduct(createProductDto, file.path)
    }

    // @Get('product-image/:imagename')
    // findProductImage(@Param('imagename') imagename: string, @Res() res){
    //     console.log(process.cwd() + 'store/productImages/' + imagename)
    //     return res.sendFile(process.cwd() + '/store/productImages/' + imagename)
    // }

    @Get(':id')
    getProductDetails(@Param('id', UUIDValidationPipe) id:string): Promise<{data: Product}>{
        return this.adminService.getProductDetails(id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', storage))
    updateProduct(@Param('id', UUIDValidationPipe) id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile() file: Express.Multer.File){
        return this.adminService.updateProduct(id, updateProductDto, file);
    }

    @Delete(':id')
    deleteProduct(@Param('id', UUIDValidationPipe) id: string): Promise<any>{
        return this.adminService.deleteProduct(id);
    }


    
}
