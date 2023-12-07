import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/track') // Укажите путь, который будет обрабатывать этот метод
  track(@Body() data: any): string {
    // data содержит данные из тела запроса
    console.log(data);

    // Возвращаем те же данные в ответ
    return data;
  }
}
