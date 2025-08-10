import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Crown, Check, Star, Shield } from 'lucide-react';

export function SubscriptionManager() {
  const { user, session, userRole, subscriptionTier, checkSubscription } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionPlans = [
    {
      tier: 'free_student',
      name: 'Free Student',
      price: 'Free',
      description: 'Basic access to selected courses',
      features: [
        'Access to 3 basic courses',
        'Community support',
        'Basic progress tracking'
      ],
      icon: Star,
      color: 'border-gray-200'
    },
    {
      tier: 'premium_student',
      name: 'Premium Student',
      price: '$9.99/month',
      description: 'Full access to all courses and premium features',
      features: [
        'Unlimited course access',
        'Premium support',
        'Advanced analytics',
        'Certificate downloads',
        'Priority content'
      ],
      icon: Crown,
      color: 'border-blue-500'
    },
    {
      tier: 'free_teacher',
      name: 'Free Teacher',
      price: 'Free',
      description: 'Create up to 5 classes',
      features: [
        'Create up to 5 classes',
        'Basic class management',
        'Student progress tracking',
        'Community support'
      ],
      icon: Star,
      color: 'border-green-200'
    },
    {
      tier: 'premium_teacher',
      name: 'Premium Teacher',
      price: '$19.99/month',
      description: 'Unlimited classes and advanced features',
      features: [
        'Unlimited classes',
        'Advanced analytics',
        'Custom assignments',
        'Priority support',
        'Bulk user management',
        'Advanced reporting'
      ],
      icon: Shield,
      color: 'border-green-500'
    }
  ];

  const handleUpgrade = async (planTier: string) => {
    if (!session?.access_token) {
      toast({
        title: "Authentication required",
        description: "Please log in to upgrade your subscription.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier: planTier },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session?.access_token) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPlan = (planTier: string) => {
    return userRole === planTier || subscriptionTier === planTier;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Upgrade your learning experience with premium features
        </p>
        <div className="mt-4">
          <Button
            onClick={checkSubscription}
            variant="outline"
            size="sm"
          >
            Refresh Subscription Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionPlans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = isCurrentPlan(plan.tier);
          
          return (
            <Card key={plan.tier} className={`relative ${plan.color} ${isCurrent ? 'ring-2 ring-primary' : ''}`}>
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Current Plan
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="text-2xl font-bold text-primary">{plan.price}</div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {!isCurrent && plan.tier !== 'free_student' && plan.tier !== 'free_teacher' && (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(plan.tier)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Upgrade'}
                  </Button>
                )}
                
                {isCurrent && (plan.tier === 'premium_student' || plan.tier === 'premium_teacher') && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleManageSubscription}
                    disabled={isLoading}
                  >
                    Manage Subscription
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}