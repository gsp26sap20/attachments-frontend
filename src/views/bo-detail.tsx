import '@ui5/webcomponents-icons/refresh.js';
import '@ui5/webcomponents-icons/decline.js';
import { Text } from '@ui5/webcomponents-react/Text';
import { Icon } from '@ui5/webcomponents-react/Icon';
import { useNavigate, useParams } from 'react-router';
import { Title } from '@ui5/webcomponents-react/Title';
import { Label } from '@ui5/webcomponents-react/Label';
import { Button } from '@ui5/webcomponents-react/Button';
import { FlexBox } from '@ui5/webcomponents-react/FlexBox';
import { Toolbar } from '@ui5/webcomponents-react/Toolbar';
import { API } from '@/features/business-objects/constants';
import '@ui5/webcomponents-icons/business-objects-mobile.js';
import { MessageBox } from '@ui5/webcomponents-react/MessageBox';
import { ObjectPage } from '@ui5/webcomponents-react/ObjectPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumbs } from '@ui5/webcomponents-react/Breadcrumbs';
import { ToolbarButton } from '@ui5/webcomponents-react/ToolbarButton';
import { BusyIndicator } from '@ui5/webcomponents-react/BusyIndicator';
import { BreadcrumbsItem } from '@ui5/webcomponents-react/BreadcrumbsItem';
import { ObjectPageTitle } from '@ui5/webcomponents-react/ObjectPageTitle';
import { ObjectPageSection } from '@ui5/webcomponents-react/ObjectPageSection';
import { BizObjectLinkedAttachments } from '@/features/business-objects/components';
import { bizObjectDetailQueryOptions } from '@/features/business-objects/options/query';

export function BoDetailView() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: bizObject,
    error,
    isFetching: isBizObjectFetching,
    // refetch: refetchBizObject,
  } = useQuery(
    bizObjectDetailQueryOptions(id!, {
      'sap-client': 324,
      $select: API.select,
    }),
  );

  const refetchBizObject = function () {
    queryClient.invalidateQueries({
      queryKey: ['biz-objects', id],
    });
  };

  return (
    <div className="relative">
      <ObjectPage
        mode="Default"
        image={
          <div className="border rounded-lg aspect-square flex! items-center justify-center p-2">
            <Icon name="business-objects-mobile" className="w-full h-full text-primary" />
          </div>
        }
        hidePinButton={true}
        titleArea={
          <ObjectPageTitle
            breadcrumbs={
              <Breadcrumbs
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) {
                    navigate(route);
                  }
                }}
              >
                <BreadcrumbsItem data-route="/business-objects">Business Objects</BreadcrumbsItem>
                <BreadcrumbsItem>
                  {isBizObjectFetching ? 'Loading...' : bizObject?.BoTitle || 'Unnamed Object'}
                </BreadcrumbsItem>
              </Breadcrumbs>
            }
            header={
              <Title level="H2">{isBizObjectFetching ? 'Loading...' : bizObject?.BoTitle || 'Unnamed Object'}</Title>
            }
            subHeader={isBizObjectFetching ? 'Loading...' : bizObject?.BoId || '–'}
            actionsBar={
              <Toolbar design="Transparent" style={{ height: 'auto' }}>
                <ToolbarButton design="Default" icon="refresh" text="Refresh" onClick={() => refetchBizObject()} />
                <ToolbarButton
                  design="Emphasized"
                  text="Edit"
                  onClick={() => {}}
                  disabled={!bizObject?.__EntityControl.Updatable}
                />
                <ToolbarButton
                  design="Negative"
                  text="Delete"
                  onClick={() => {}}
                  disabled={!bizObject?.__EntityControl.Deletable}
                />
              </Toolbar>
            }
            navigationBar={
              <Button
                accessibleName="Close"
                design="Transparent"
                icon="decline"
                tooltip="Close"
                onClick={() => navigate(-1)}
              />
            }
          />
        }
      >
        {isBizObjectFetching && (
          <FlexBox alignItems="Center" justifyContent="Center" style={{ padding: '1rem', minHeight: '50dvh' }}>
            <BusyIndicator delay={0} active size="L" />
          </FlexBox>
        )}
        <ObjectPageSection
          aria-label="General Information"
          id="general"
          titleText="General Information"
          hideTitleText={true}
          style={{ display: isBizObjectFetching ? 'none' : 'block' }}
        >
          <div className="md:grid md:grid-cols-3 gap-3">
            <div className="space-y-3">
              <Title level="H3">Basic Data</Title>
              <div className="flex flex-col">
                <Label showColon>Title</Label>
                <Text>{bizObject?.BoTitle || '–'}</Text>
              </div>
              <div className="flex flex-col">
                <Label showColon>Type</Label>
                <Text>{bizObject?.BoType || '–'}</Text>
              </div>
              <div className="flex flex-col">
                <Label showColon>Status</Label>
                <Text>{bizObject?.Status || '–'}</Text>
              </div>
            </div>
            <div className="space-y-3 md:col-span-2">
              <Title level="H3">Audit Information</Title>
              <div className="md:grid md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <Label showColon>Created By</Label>
                    <Text>{bizObject?.Ernam || '–'}</Text>
                  </div>
                  <div className="flex flex-col">
                    <Label showColon>Created On</Label>
                    <Text>{bizObject?.Erdat || '–'}</Text>
                  </div>
                  <div className="flex flex-col">
                    <Label showColon>Created At</Label>
                    <Text>{bizObject?.Erzet || '–'}</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <Label showColon>Last Changed By</Label>
                    <Text>{bizObject?.Aenam || '–'}</Text>
                  </div>
                  <div className="flex flex-col">
                    <Label showColon>Last Changed On</Label>
                    <Text>{bizObject?.Aedat || '–'}</Text>
                  </div>
                  <div className="flex flex-col">
                    <Label showColon>Last Changed At</Label>
                    <Text>{bizObject?.Aezet || '–'}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ObjectPageSection>
        <ObjectPageSection
          aria-label="Linked Attachments"
          id="linked-attachments"
          titleText="Linked Attachments"
          style={{ display: isBizObjectFetching ? 'none' : 'block' }}
        >
          <BizObjectLinkedAttachments
            boId={id!}
            disable={!bizObject || !bizObject?.__OperationControl.link_attachment}
          />
        </ObjectPageSection>
      </ObjectPage>
      {/* {isRollbacking && (
        <FlexBox
          alignItems="Center"
          justifyContent="Center"
          style={{
            padding: '1rem',
            minHeight: '50dvh',
            position: 'absolute',
            inset: 0,
          }}
        >
          <BusyIndicator delay={0} active size="L" />
        </FlexBox>
      )} */}
      {error && (
        <MessageBox open title="Error" type="Error" onClose={() => navigate('/business-objects')}>
          {error?.response?.data?.error?.message || error.message}
          <ul className="list-disc list-inside">
            {error?.response?.data?.error?.details?.map((detail, index) => (
              <li key={index}>{detail.message}</li>
            ))}
          </ul>
        </MessageBox>
      )}
    </div>
  );
}
