import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sum1')
  async sum1(@Body('numbers') numbers: number[]): Promise<number> {
    try {
      const response = await axios.post<number>(
        'http://localhost:3001/math/sum',
        {
          numbers,
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error caling the microservice', error);
      throw error;
    }
  }
}
