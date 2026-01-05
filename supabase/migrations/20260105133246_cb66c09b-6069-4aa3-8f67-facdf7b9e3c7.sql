-- Add RLS policies to protect newsletter_subscriptions from unauthorized UPDATE and DELETE

-- Only admins can update newsletter subscriptions
CREATE POLICY "Only admins can update newsletter subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete newsletter subscriptions
CREATE POLICY "Only admins can delete newsletter subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));