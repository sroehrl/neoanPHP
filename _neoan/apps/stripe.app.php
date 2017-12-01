<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 4/1/2017
 * Time: 11:56 AM
 * @property layout uni
 */
class stripe {
    static function init($apiKey) {
        require_once(path . '/_neoan/apps/plugins/stripe/init.php');
        \Stripe\Stripe::setApiKey($apiKey);
    }
    static function charge($chargeObj){
        try{
            $charge = \Stripe\Charge::create($chargeObj);
        } catch (\Stripe\Error\Card $e){
            return ['error'=>'declined'];
        } catch (\Stripe\Error\RateLimit $e) {
            return ['error'=>'call_limit'];
        } catch (\Stripe\Error\InvalidRequest $e) {
            $body = $e->getJsonBody();
            db::ask('error',['info'=>$body['error']]);
            return ['error'=>'request_invalid'];
        } catch (\Stripe\Error\Authentication $e) {
            $body = $e->getJsonBody();
            db::ask('error',['info'=>$body['error']]);
            return ['error'=>'critical'];
        } catch (\Stripe\Error\ApiConnection $e) {
            $body = $e->getJsonBody();
            db::ask('error',['info'=>$body['error']]);
            return ['error'=>'try_again'];
        } catch (\Stripe\Error\Base $e) {
            $body = $e->getJsonBody();
            db::ask('error',['info'=>$body['error']]);
            return ['error'=>'critical'];
        } catch (Exception $e) {
            db::ask('error',['info'=>'stripe_system error stripe.api']);
            return ['error'=>'critical_system'];
        }
        $charge['error'] = false;
        return $charge;
    }

}